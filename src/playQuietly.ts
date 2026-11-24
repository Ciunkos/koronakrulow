/* Starts a media element without an unhandled rejection: browsers block play()
   until the visitor has interacted with the page, and the game then simply
   stays quiet. Resolves whether playback started. */
export const playQuietly = async (
  player: Pick<HTMLMediaElement, "play"> | null | undefined
): Promise<boolean> => {
  if (!player) {
    return false;
  }
  try {
    await player.play();
    return true;
  } catch {
    return false;
  }
};
