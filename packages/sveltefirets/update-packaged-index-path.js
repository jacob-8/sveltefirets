import replace from 'replace-in-file';

try {
  const results = replace.sync({
    files: 'package/package.json',
    from: /src\/lib\/index.ts/g,
    to: 'index.js',
  });
  console.log('Replacement results:', results);
} catch (error) {
  console.error('Error occurred:', error);
}
