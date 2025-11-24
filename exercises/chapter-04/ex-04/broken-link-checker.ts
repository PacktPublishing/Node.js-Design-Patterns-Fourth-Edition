import { Parser } from "htmlparser2";
import { ErrCb, TaskQueue } from "./task-queue";

export class BrokenLinksChecker {
  private readonly links = new Array<string>();
  private readonly spidering = new Set<string>();

  constructor(
    private readonly url: string,
    private readonly depth: number,
    private readonly queue: TaskQueue,
  ) {}

  public check(cb: (err: Error | null, links?: Array<string>) => void) {
    this.queue.on("error", cb);
    this.queue.on("empty", () => cb(null, this.links));
    this.queue.pushTask((queueCb) => {
      this.checkPage(this.url, this.depth, queueCb);
    });
  }

  private checkPage(url: string, depth: number, cb: ErrCb) {
    if (this.spidering.has(url)) {
      return cb();
    }

    this.spidering.add(url);

    this.getPage(url, (err, content) => {
      if (err) {
        return cb(err);
      }

      if (content.status === 404) {
        this.links.push(url);
        return cb();
      }

      const pageLinks = this.getPageLinks(url, content.data);

      if (!pageLinks.length || !depth) {
        return cb();
      }

      for (const pageLink of pageLinks) {
        this.queue.pushTask((queueCb) => {
          this.checkPage(pageLink, depth - 1, queueCb);
        });
      }

      cb();
    });
  }

  private getPage(
    url: string,
    cb: (err: Error | null, content?: { status: number; data: string }) => void,
  ) {
    fetch(url)
      .then((response) =>
        Promise.all([response.status, response.arrayBuffer()]),
      )
      .then((content) =>
        cb(null, {
          status: content[0],
          data: Buffer.from(content[1]).toString("utf-8"),
        }),
      )
      .catch((err) => cb(err));
  }

  private getPageLinks(currentUrl: string, body: string) {
    const url = new URL(currentUrl);
    const internalLinks = new Array<string>();
    const parser = new Parser({
      onopentag(name, attribs) {
        if (name === "a" && attribs.href) {
          const newUrl = new URL(attribs.href, url);
          if (
            newUrl.hostname === url.hostname &&
            newUrl.pathname !== url.pathname
          ) {
            internalLinks.push(newUrl.toString());
          }
        }
      },
    });
    parser.end(body);

    return internalLinks;
  }
}
