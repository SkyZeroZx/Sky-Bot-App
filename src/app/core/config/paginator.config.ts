import { MatPaginatorIntl } from "@angular/material/paginator";

 
export function CUSTOM_PAGINATOR_LABEL() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Filas por pagina:';

  return customPaginatorIntl;
}