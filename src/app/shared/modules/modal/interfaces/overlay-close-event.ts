export type OverlayCloseEventType = 'backdropClick' | 'close' | string | null;

export interface OverlayCloseEvent<R, E extends OverlayCloseEventType = OverlayCloseEventType> {
  type: E;
  data: R;
}
