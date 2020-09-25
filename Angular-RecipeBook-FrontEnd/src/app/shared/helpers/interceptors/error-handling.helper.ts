const exceptionCodeMessages: { [exceptionCode: number]: string } = {
  [1]: 'Logged in user not found in the system!',
  [2]: 'This recipe not found in the system!',
  [3]: 'This upgradeable recipe is not found in this system!',
  [4]: 'This deletable recipe is not found in this system!',
};

export function localizeException(exceptionCode: number): string {
  const exceptionMessage = exceptionCodeMessages[exceptionCode];

  console.log(exceptionMessage);

  if (exceptionMessage) {
    return exceptionMessage;
  }

  return getBadRequestMessage();
}

export function getBadRequestMessage(): string {
  return 'Unknow error!';
}

export function getInternalServerErrorMessage(): string {
  return 'Internal server error!';
}
