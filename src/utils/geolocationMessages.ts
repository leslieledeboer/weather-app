const MESSAGES_BY_CODE: Record<number, string> = {
  [GeolocationPositionError.PERMISSION_DENIED]: "Location access denied — search for a city instead",
  [GeolocationPositionError.POSITION_UNAVAILABLE]: "Location unavailable — search for a city instead",
  [GeolocationPositionError.TIMEOUT]: "Request timed out — search for a city instead",
};

export function getGeolocationMessage(error: unknown): string {
  if (error instanceof GeolocationPositionError && error.code in MESSAGES_BY_CODE) {
    return MESSAGES_BY_CODE[error.code];
  }

  return "Failed to detect location — search for a city instead";
}