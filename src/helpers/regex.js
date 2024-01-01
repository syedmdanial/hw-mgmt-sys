export const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
);

export const emailRegex = new RegExp(
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
);

export const emailReg =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';

export const phoneRegex = new RegExp(
  /^[+]*[(]{0,1}[(,+,0-9]{1,4}[)]{0,1}[0-9]*$/
);

export const domainRegex = new RegExp(
  '^(?!://)([a-zA-Z0-9-]+.){0,5}[a-zA-Z0-9-]+.[a-zA-Z]{2,64}?$'
);
