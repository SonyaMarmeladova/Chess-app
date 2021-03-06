import { ApiType } from '@core/enums/api-url-type.enum';
import { FIDELiderboardMocks } from './mocks/fide-liderboard/fide-liderboard.class';
import { AppLiderboardMocks } from './mocks/app-liderboard/app-liderboard.class';
import { FriendsListMocks } from './mocks/friends-list/friends-list.class';
import { OpeningsMocks } from './mocks/openings/openings.class';
import { MockBackendUrl } from './mock-backend-url.class';

const UrlsConfig = {
  [ApiType.MongoAPI]: {
    '/ChikiBambuki/FIDELeaderboard': new FIDELiderboardMocks(),
    '/ChikiBambuki/AppLeaderboard': new AppLiderboardMocks(),
    '/ChikiBambuki/UsersList': new FriendsListMocks(),
    '/ChikiBambuki/Openings': new OpeningsMocks()
  }
};

export const MockBackendConfig: MockBackendUrl = new MockBackendUrl(UrlsConfig);

export const defaultMockDelay = 400;
