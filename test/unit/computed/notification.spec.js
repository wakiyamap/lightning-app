import { Store } from '../../../src/store';
import ComputedNotification from '../../../src/computed/notification';
import NavAction from '../../../src/action/nav';

describe('Computed Notification Unit Tests', () => {
  let store;
  let nav;

  beforeEach(() => {
    store = new Store();
    nav = new NavAction(store);
  });

  describe('ComputedNotification()', () => {
    it('should work with initial store', () => {
      ComputedNotification(store);
      expect(store.lastNotification, 'to equal', null);
      expect(store.displayNotification, 'to equal', false);
      expect(store.computedNotifications, 'to equal', []);
      expect(store.notificationCountLabel, 'to equal', '0');
    });

    it('should set notification attributes', () => {
      store.notifications.push({
        type: 'error',
        message: 'Oops something went wrong',
        date: new Date(1528703821406),
        display: true,
      });
      store.notifications.push({
        type: 'info',
        message: 'Syncing to chain',
        date: new Date(1528703821407),
        display: true,
        waiting: true,
      });
      store.notifications.push({
        type: 'info',
        message: 'Syncing to chain',
        date: new Date(1528703821408),
        display: true,
        waiting: true,
      });
      ComputedNotification(store);
      expect(store.lastNotification.type, 'to equal', 'info');
      expect(store.displayNotification, 'to equal', true);
      expect(store.computedNotifications, 'to satisfy', [
        {
          typeLabel: 'Info',
          message: 'Syncing to chain',
          dateLabel: new Date(1528703821407).toLocaleDateString(),
          dateTimeLabel: new Date(1528703821407).toLocaleString(),
        },
        {
          typeLabel: 'Error',
          message: 'Oops something went wrong',
          dateLabel: new Date(1528703821406).toLocaleDateString(),
          dateTimeLabel: new Date(1528703821406).toLocaleString(),
        },
      ]);
      expect(store.notificationCountLabel, 'to equal', '2');
    });

    it('should zero notification count after navigating to view', () => {
      nav.goNotifications();
      ComputedNotification(store);
      expect(store.notificationCountLabel, 'to equal', '0');
    });
  });
});
