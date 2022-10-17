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

export const validEmail = (e: { target: { value: string } }, setError: (arg0: boolean) => void) => {
  if (e.target.value) {
    setError(/^[^\s@]+@[^\s@]+\.[\S]{2,}$/.test(e.target.value));
  } else {
    setError(false);
  }
};

export const validLogin = (e: { target: { value: string } }, setError: (arg0: boolean) => void) => {
  if (e.target.value) {
    setError(/^[0-9a-zA-Z\-_]{3,20}$/.test(e.target.value));
  } else {
    setError(false);
  }
};

export const validFirstName = (e: { target: { value: string } }, setError: (arg0: boolean) => void) => {
  if (e.target.value) {
    setError(/^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/.test(e.target.value));
  } else {
    setError(false);
  }
};

export const validSecondName = (e: { target: { value: string } }, setError: (arg0: boolean) => void) => {
  if (e.target.value) {
    setError(/^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/.test(e.target.value));
  } else {
    setError(false);
  }
};

export const validPhone = (e: { target: { value: string } }, setError: (arg0: boolean) => void) => {
  if (e.target.value) {
    setError(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/.test(e.target.value));
  } else {
    setError(false);
  }
};

export const validPassword = (e, setError: (arg0: boolean) => void) => {
  if (e.target.value) {
    setError(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(e.target.value));
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
