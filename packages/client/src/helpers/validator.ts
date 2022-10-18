/**
 * Пример использования (передаем в инпут как, например, callback на событие blur):
 * const onBlur = (event) => {
 *   const result = validation(event.target.value, [minLengthRule(5), maxLengthRule(20)]);
 * };
 */

export type Validation = (value: unknown, rules: ValidityRules) => ValidationReturnment;
export type ValidityRules = ValidityRule[];
export type ValidityRule = (value: unknown) => true | string;
export type ValidationReturnment = { isValid: boolean; errorMessages?: string[] };

/**
 * @param {unknown} value - проверяемое значение
 * @param {ValidityRule[]} rules - массив функций-правил валидации.
 * @return {ValidationReturnment} Объект с признаком валидности и, необязательно, массивом сообщений об ошибке
 */
export const validation: Validation = (value, rules) => {
  // Проверяем, есть ли правило, которое не сработало (вернуло текст ошибки)
  const failedRules = rules.reduce<string[]>((acc, ruleFunc) => {
    const result = ruleFunc(value);
    if (typeof result === 'string') {
      acc.push(result);
    }
    return acc;
  }, []);

  if (failedRules?.length > 0) {
    return { isValid: false, errorMessages: failedRules };
  }
  return { isValid: true };
};

/**
 *  Возвращает правило валидации на минимальную длину
 * @param {number} length - минимальная длина
 * @return {ValidityRule} - возвращает правило валидации с нужным числом
 */
export const minLengthRule = (length: number) => {
  return (value: unknown) => {
    if (typeof value !== 'string') return 'Ошибка типа данных';
    if (!value) return true;
    return value.length >= length || `Минимум ${length} символов.`;
  };
};

/**
 *  Возвращает правило валидации на максимальную длину
 * @param {number} length - максимальная длина
 * @return {ValidityRule} - возвращает правило валидации с нужным числом
 */
export const maxLengthRule = (length: number) => {
  return (value: unknown) => {
    if (typeof value !== 'string') return 'Ошибка типа данных';
    if (!value) return true;
    return value.length <= length || `Максимум ${length} символов`;
  };
};

export const loginRule = (value: unknown) => {
  if (typeof value !== 'string') return 'Ошибка типа данных';
  if (!value) return true;
  const login = /^[0-9a-zA-Z\-_]{3,20}/;
  return login.test(value) || 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание';
};

export const nameRule = (value: unknown) => {
  if (typeof value !== 'string') return 'Ошибка типа данных';
  if (!value) return true;
  const name = /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/;
  return name.test(value) || 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание';
};

export const phoneRule = (value: unknown) => {
  if (typeof value !== 'string') return 'Ошибка типа данных';
  if (!value) return true;
  const phone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/;
  return phone.test(value) || 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание';
};

export const passwordRule = (value: unknown) => {
  if (typeof value !== 'string') return 'Ошибка типа данных';
  if (!value) return true;
  const phone = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,40}$/;
  return phone.test(value) || 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание';
};

export const comparePasswordsRules = (firstPassword: string, secondPassword: string) => {
  return firstPassword === secondPassword || 'Пароли отличаются';
};

export const validationRules = {
  login: /^[0-9a-zA-Z\-_]{3,20}/,
  email: /^[0-9a-zA-Z\-_]{3,20}$/,
  name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,40}$/,
};

export const valid = (
  e: { target: { value: string } },
  rule: { test: (arg0: string) => boolean },
  setError: (arg0: boolean) => void,
) => {
  if (e.target.value) {
    setError(rule.test(e.target.value));
  } else {
    setError(false);
  }
};

export const validSecondPassword = (
  e: { target: { value: string } },
  firstPassword: string,
  secondPassword: string,
  setError: (arg0: boolean) => void,
) => {
  if (e) {
    setError(firstPassword === secondPassword);
  } else {
    setError(false);
  }
};
