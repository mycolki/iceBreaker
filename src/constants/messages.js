export const BATTLE = {
  WAITING: {
    type: 'battle',
    text: '빈 방에 입장하거나, 전달받은 ID로 들어갈 수 있습니다',
  },
  PLEASE_READY: {
    type: 'battle',
    text: '모두 READY를 누르면 3초후 게임이 시작됩니다',
  },
};

export const ENTER_ROOM = {
  FILL_BLANK: {
    type: 'enterRoom',
    text: 'ID가 입력되지 않았습니다',
  },
  INVALID_ID: {
    type: 'enterRoom',
    text: '존재하지 않는 ID입니다. 다시 확인해주세요!',
  },
  ONLY_NUMBER: {
    type: 'enterRoom',
    text: 'ID는 모두 숫자입니다',
  },
};

export const MAKE_ROOM = {
  FILL_BLANK: {
    type: 'makeRoom',
    text: '닉네임은 공백으로 설정할 수 없습니다',
  },
  URL_COPIED: {
    type: 'makeRoom',
    text: '방ID가 클립보드에 복사되었습니다',
  },
};

export const VALIDATION_INPUT = {
  TYPE: 'validationInput',
  FILL_BLANK: {
    type: 'validationInput',
    text: '아무 글자도 입력되지 않았습니다',
  },
  ONLY_KOREAN: {
    type: 'validationInput',
    text: '아이스브레이커 정답은 모두 한글입니다',
  },
};

export const VALIDATION_ANSWER = {
  TYPE: 'validationAnswer',
  ALL_WRONG: {
    type: 'validationAnswer',
    text: '단 한 글자도 맞지 않네요',
  },
};

export const BREAK = {
  Lv1: {
    type: 'break',
    text: '시간 내에 최대한 많은 얼음을 깨주세요!',
  },
  Lv2: {
    type: 'break',
    text: '자 얼음을 깰 시간이예요!',
  },
  Lv3: {
    type: 'break',
    text: '이번엔 한 번에 꺠긴 어려울 거에요',
  },
  Lv4: {
    type: 'break',
    text: '열번 찍어도 안 꺠지는 얼음이 있다?',
  },
  Lv5: {
    type: 'break',
    text: '시간 내에 최대한 많은 얼음을 깨주세요!',
  },
  Lv6: {
    type: 'break',
    text: '이런, 곰이 얼음을 가리고 있어요!',
  },
  Lv7: {
    type: 'break',
    text: '이번 얼음만 깨면 아이스브레이커가 될 수 있어요!',
  },
};

export const ANSWER = {
  Lv1: {
    type: 'answer',
    text: '⏰ 제한 시간 내에 정답을 맞춰주세요 ⏰ ',
  },
  Lv2: {
    type: 'answer',
    text: '⏰ 제한 시간 내에 정답을 맞춰주세요 ⏰ ',
  },
  Lv3: {
    type: 'answer',
    text: '⏰ 제한 시간 내에 정답을 맞춰주세요 ⏰ ',
  },
  Lv4: {
    type: 'answer',
    text: '🥤 어렵다면 힌트를 사용해보세요 🥤',
  },
  Lv5: {
    type: 'answer',
    text: '🥤 어렵다면 힌트를 사용해보세요 🥤',
  },
  Lv6: {
    type: 'answer',
    text: '🥤 어렵다면 힌트를 사용해보세요 🥤',
  },
  Lv7: {
    type: 'answer',
    text: '⏰ 마지막 문제! 제한 시간 내에 정답을 맞춰주세요 ⏰',
  },
};
