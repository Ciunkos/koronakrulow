export const ANALYTICS_ENABLED = false;

// Analytics are switched off; calls name the event that would be sent.
const analytics = (_event: string): void => {
  return;
};

export default analytics;
