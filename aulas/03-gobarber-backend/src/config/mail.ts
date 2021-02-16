interface IMailConfig {
  driver: 'ethereal' | 'ses'
  default: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER_ENV || 'ethereal',
  default: {
    from: {
      email: 'amaziero@gobarber.me',
      name: 'Alison Maziero'
    }
  }
} as IMailConfig
