export interface Certificate {
  idCertificate: number | string;
  idStatusDocument: string;
  url: string;
  registerDate: string | Date;
}

export interface CertificateCreate {
  idStatusDocument: string;
  file: File;
}
