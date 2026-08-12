/** Re-selecting an exhibit is a no-op only when its model is actually mounted. */
export function shouldPresentSelection(requestedId: string, mountedId?: string): boolean {
  return requestedId !== mountedId;
}
