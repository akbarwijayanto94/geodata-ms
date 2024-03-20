import { Readable } from 'stream'

export function buildMockFile(
  fieldname: string,
  filename: string,
  size: number,
  mimetype: string = ''
): Express.Multer.File | null {
  return {
    fieldname,
    filename,
    size,
    mimetype,
    originalname: '',
    encoding: '',
    destination: '',
    path: '',
    stream: new Readable(),
    buffer: Buffer.alloc(4),
  }
}
