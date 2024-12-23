class Boat {
  constructor(config) {
    this.hasMotor = Boolean(config.hasMotor)
    this.motorCount = config.motorCount || 0
    this.motorBrand = config.motorBrand || ''
    this.motorModel = config.motorModel || ''
    this.hasSails = Boolean(config.hasSails)
    this.sailsCount = config.sailsCount || 0
    this.sailsMaterial = config.sailsMaterial || ''
    this.sailsColor = config.sailsColor || ''
    this.hullColor = config.hullColor || ''
    this.hasCabin = Boolean(config.hasCabin)
  }
}

export class BoatBuilder {
  withMotors(count, brand, model) {
    this.hasMotor = true
    this.motorCount = count
    this.motorBrand = brand
    this.motorModel = model
    return this
  }

  withSails(count, material, color) {
    this.hasSails = true
    this.sailsCount = count
    this.sailsMaterial = material
    this.sailsColor = color
    return this
  }

  hullColor(color) {
    this.hullColor = color
    return this
  }

  withCabin() {
    this.hasCabin = true
    return this
  }

  build() {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin,
    })
  }
}
