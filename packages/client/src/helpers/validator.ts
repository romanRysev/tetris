/**
 * Пример использования (передаем в инпут как, например, callback на событие blur):
 * const onBlur = (event) => {
 *   const result = validation(event.target.value, [minLengthRule(5), maxLengthRule(20)]);
 * };
 */

export type Validation = (value: string, rules: ValidityRules) => ValidationReturnment;
export type ValidityRules = ValidityRule[];
export type ValidityRule = (value: string) => true | string;
export type ValidationReturnment = { isValid: boolean; errorMessages: string[] };

/**
 * @param {string} value - проверяемое значение
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
  return { isValid: true, errorMessages: [] };
};

/**
 *  Возвращает правило валидации на минимальную длину
 * @param {number} length - минимальная длина
 * @return {ValidityRule} - возвращает правило валидации с нужным числом
 */
export const minLengthRule = (length: number) => {
  return (value: string) => {
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
  return (value: string) => {
    if (!value) return true;
    return value.length <= length || `Максимум ${length} символов`;
  };
};

export const requiredRule = (value: string) => {
  console.log(value);

  return value?.length > 0 || 'Поле обязательное';
};

export const loginRule = (value: string) => {
  if (!value) return true;
  const login = /^[0-9a-zA-Z\-_]{3,20}/;
  return login.test(value) || 'от 3 до 20 символов, латиница, цифры, допустимы дефис и нижнее подчёркивание';
};

export const nameRule = (value: string) => {
  if (!value) return true;
  const name = /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/;
  return name.test(value) || 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов';
};

export const phoneRule = (value: string) => {
  if (!value) return true;
  const phone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/;
  return phone.test(value) || 'Проверьте правильность номера телефона';
};

export const passwordRule = (value: string) => {
  if (!value) return true;
  const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,40}$/;
  return password.test(value) || 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква, цифра и спецсимвол';
};

export const emailRule = (value: string) => {
  if (!value) return true;
  const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return email.test(value) || 'Проверьте правильность введенного email';
};

export const comparePasswordsRules = (firstPassword: string | undefined, secondPassword: string | undefined) => {
  return () => {
    return firstPassword === secondPassword || 'Пароли отличаются';
  };
};
