import { createReadStream } from 'node:fs'
import { basename } from 'node:path'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3' // v3.750.0

const [bucketName, filePath] = process.argv.slice(2)

if (!(bucketName && filePath)) {
  console.error('Usage: node index.js <bucketName> <filePath>')
  process.exit(1)
}

const s3Client = new S3Client()
const fileStream = createReadStream(filePath)
const key = basename(filePath)

// Set the parameters for the PutObject command.
const params = {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  Bucket: bucketName,
  // biome-ignore lint/style/useNamingConvention: <explanation>
  Key: key,
  // biome-ignore lint/style/useNamingConvention: <explanation>
  Body: fileStream,
}

try {
  // Create a PutObject command object.
  const putObjectCommand = new PutObjectCommand(params)
  // Send the command to S3.
  const data = await s3Client.send(putObjectCommand)
  console.log('Successfully uploaded file to S3', data)
} catch (err) {
  console.log('Error', err)
}
