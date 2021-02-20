import { container } from 'tsyringe';
import IStorageProvider from '../StoreProviders/models/IStorageProvider';
import DiskStorageProvider from '../StoreProviders/implementations/DiskStorageProvider';
import S3StorageProvider from '../StoreProviders/implementations/S3StorageProvider';
import uploadConfig from '@config/upload'

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
)
