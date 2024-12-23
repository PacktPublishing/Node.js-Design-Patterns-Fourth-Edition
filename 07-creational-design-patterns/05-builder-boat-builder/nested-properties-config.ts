export type BoatConfig = {
  motor?: {
    count: number
    brand: string
    model: string
  }
  sails?: {
    count: number
    material: string
    color: string
  }
  hullColor: string
  hasCabin: boolean
}

class Boat {
  hasMotor: boolean
  motorCount: number
  motorBrand: string
  motorModel: string
  hasSails: boolean
  sailsCount: number
  sailsMaterial: string
  sailsColor: string
  hullColor: string
  hasCabin: boolean

  constructor(config: BoatConfig) {
    // in real life you'd use the config
    this.hasMotor = Boolean(config.motor)
    this.motorCount = config.motor?.count || 0
    this.motorBrand = config.motor?.brand || ''
    this.motorModel = config.motor?.model || ''
    this.hasSails = Boolean(config.sails)
    this.sailsCount = config.sails?.count || 0
    this.sailsMaterial = config.sails?.material || ''
    this.sailsColor = config.sails?.color || ''
    this.hullColor = config.hullColor || ''
    this.hasCabin = Boolean(config.hasCabin)
  }
}

const myBoat = new Boat({
  motor: {
    count: 2,
    brand: 'Best Motor Co. ',
    model: 'OM123',
  },
  sails: {
    count: 1,
    material: 'fabric',
    color: 'white',
  },
  hullColor: 'blue',
  hasCabin: false,
})

console.log(myBoat)
