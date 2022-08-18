import {InjectionToken} from '@angular/core';
import {TyqoonModalConfig} from '../interfaces/tyqoon-modal-config';

export const MODAL_DATA = new InjectionToken('ModalData');
export const MODAL_ADDITIONAL_CONFIG = new InjectionToken('ModalAdditionalConfig');
export const TYQOON_MODAL_CONFIG =  new InjectionToken<TyqoonModalConfig>('TyqoonModalConfig');
