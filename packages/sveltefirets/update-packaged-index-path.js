import replace from 'replace-in-file';

try {
  const results = replace.sync({
    files: 'package/package.json',
    from: /src\/lib\/index-client.ts/g,
    to: 'index-client.js',
  });
  console.log('Replacement results:', results);
  
  const results2 = replace.sync({
    files: 'package/package.json',
    from: /src\/lib\/index-server.ts/g,
    to: 'index-server.js',
  });
  console.log('Replacement results:', results2);
} catch (error) {
  console.error('Error occurred:', error);
}
