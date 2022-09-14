export function CelularTelefone(text) {
  if (text.length === 14) {
    const onlyNumber = text.replace(/\D/g, '');
    return text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(
        onlyNumber.length >= 10 ? /(\d{4})(\d)/ : /(\d{4})(\d)/,
        '$1-$2',
      );
  } else {
    const onlyNumber = text.replace(/\D/g, '');
    return text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(
        onlyNumber.length >= 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/,
        '$1-$2',
      );
  }
}