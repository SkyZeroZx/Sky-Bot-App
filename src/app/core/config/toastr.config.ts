import { GlobalConfig } from 'ngx-toastr';

export const toastrConfig: Partial<GlobalConfig> = {
  timeOut: 3000,
  toastClass: 'alert',
  positionClass: 'toast-top-right',
};
