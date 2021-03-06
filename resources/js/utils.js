export function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

export function currency(angka, prefix = 'Rp.') {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  return (
    prefix +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
}

export const fallbackImg = (e, src = '/img/fallback-image.jpg') => {
  e.target.src = src;
};

export const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);

  return list;
};

export const percentage = (price, discount) => price - (discount / 100) * price;

export const nullOrEmpty = value => {
  if (value == '' || value == null) return true;
  return false;
};
