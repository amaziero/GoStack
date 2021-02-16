interface IMailConfig {
  driver: 'ethereal' | 'ses'
}

export default {
  driver: process.env.MAIL_DRIVER_ENV || 'ethereal',
} as IMailConfig
