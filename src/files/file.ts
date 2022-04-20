export interface File extends FileMeta {
  data: Buffer;
}

export interface FileMeta {
  name: string;
  type: string;
  size: number;
}
