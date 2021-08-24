import { FireStoreParser } from './RESTParser';

describe('Firestore Parser', () => {
  // test('gracefully handles undefined', () => {
  //   expect(FireStoreParser(undefined)).toStrictEqual({});
  // });
  test('converts received data into usable json', () => {
    const firestoreJSON = {
      player: {
        mapValue: {
          fields: {
            name: {
              stringValue: 'steve',
            },
            health: {
              integerValue: '100',
            },
            alive: {
              booleanValue: true,
            },
          },
        },
      },
      level: {
        integerValue: '7',
      },
    };
    expect(FireStoreParser(firestoreJSON)).toMatchInlineSnapshot(`
      Object {
        "level": 7,
        "player": Object {
          "alive": true,
          "health": 100,
          "name": "steve",
        },
      }
    `);
  });

  const testData = {
    name: 'some/large/long/value',
    fields: {
      double: {
        doubleValue: '456',
      },
      number: {
        integerValue: '123',
      },
      array: {
        arrayValue: {
          values: [
            {
              stringValue: 'cat',
            },
            {
              stringValue: 'dog',
            },
          ],
        },
      },
      array2: {
        arrayValue: {},
      },
      timestamp: {
        timestampValue: '2018-03-11T08:00:00Z',
      },
      obj: {
        mapValue: {
          fields: {
            string: {
              stringValue: 'def',
            },
          },
        },
      },
      bool: {
        booleanValue: true,
      },
      bytes: {
        bytesValue: 'bWFkZSB0aGUgS2Vzc2VsIFJ1biBpbiBsZXNzIHRoYW4gdHdlbHZlIHBhcnNlY3M=',
      },
      string: {
        stringValue: 'abc',
      },
      geo: {
        geoPointValue: {
          latitude: 10,
          longitude: 30,
        },
      },
      ref: {
        referenceValue: 'some/large/long/value',
      },
      isNull: {
        nullValue: null,
      },
    },
    createTime: '2018-03-11T14:10:11.083793Z',
    updateTime: '2018-03-11T14:10:11.083793Z',
  };

  test('Simple JS object match', () => {
    expect(FireStoreParser({ data: '' })).toEqual({ data: '' });
  });

  test('Complex JS object match', () => {
    expect(FireStoreParser(testData)).toEqual({
      createTime: '2018-03-11T14:10:11.083793Z',
      fields: {
        array: ['cat', 'dog'],
        array2: [],
        bool: true,
        geo: {
          latitude: 10,
          longitude: 30,
        },
        isNull: null,
        double: 456,
        number: 123,
        obj: {
          string: 'def',
        },
        ref: 'some/large/long/value',
        bytes: 'bWFkZSB0aGUgS2Vzc2VsIFJ1biBpbiBsZXNzIHRoYW4gdHdlbHZlIHBhcnNlY3M=',
        string: 'abc',
        timestamp: '2018-03-11T08:00:00Z',
      },
      name: 'some/large/long/value',
      updateTime: '2018-03-11T14:10:11.083793Z',
    });
  });

  test('Bytes match', () => {
    expect(
      FireStoreParser({
        encoded: {
          bytesValue: 'bHVrZWlhbXlvdXJmYXRoZXI=',
        },
      })
    ).toEqual({
      encoded: 'bHVrZWlhbXlvdXJmYXRoZXI=',
    });
  });

  test('Strings match', () => {
    expect(
      FireStoreParser({
        createTime: '2018-03-11T14:10:11.083793Z',
      })
    ).toEqual({
      createTime: '2018-03-11T14:10:11.083793Z',
    });
  });

  test('Null match', () => {
    expect(
      FireStoreParser({
        isNull: {
          nullValue: null,
        },
      })
    ).toEqual({ isNull: null });
  });

  test('Reference match', () => {
    expect(
      FireStoreParser({
        ref: {
          referenceValue: 'some/longe/string/that/has/values',
        },
      })
    ).toEqual({
      ref: 'some/longe/string/that/has/values',
    });
  });

  test('Geo match', () => {
    expect(
      FireStoreParser({
        geo: {
          geoPointValue: {
            latitude: 10,
            longitude: 30,
          },
        },
      })
    ).toEqual({
      geo: {
        latitude: 10,
        longitude: 30,
      },
    });
  });

  test('Geo match zeros', () => {
    expect(
      FireStoreParser({
        geo: {
          geoPointValue: {},
        },
      })
    ).toEqual({
      geo: {
        latitude: 0,
        longitude: 0,
      },
    });
  });

  test('boolean match', () => {
    expect(
      FireStoreParser({
        bool: {
          booleanValue: true,
        },
      })
    ).toEqual({ bool: true });
  });

  test('double match', () => {
    expect(
      FireStoreParser({
        double: {
          doubleValue: '456',
        },
      })
    ).toEqual({ double: 456 });
  });

  test('integer match', () => {
    expect(
      FireStoreParser({
        number: {
          integerValue: '123',
        },
      })
    ).toEqual({ number: 123 });
  });

  test('Object match', () => {
    expect(
      FireStoreParser({
        obj: {
          mapValue: {
            fields: {
              string: {
                stringValue: 'def',
              },
            },
          },
        },
      })
    ).toEqual({ obj: { string: 'def' } });
  });

  test('Object match with no values', () => {
    expect(
      FireStoreParser({
        obj: {
          mapValue: {},
        },
      })
    ).toEqual({ obj: {} });
  });

  test('Object match with undefined value', () => {
    expect(
      FireStoreParser({
        obj: {
          mapValue: undefined,
        },
      })
    ).toEqual({ obj: {} });
  });

  test('Array match', () => {
    expect(
      FireStoreParser({
        array: {
          arrayValue: {
            values: [
              {
                stringValue: 'cat',
              },
              {
                stringValue: 'dog',
              },
            ],
          },
        },
      })
    ).toEqual({ array: ['cat', 'dog'] });
  });

  test('Array match with no values', () => {
    expect(
      FireStoreParser({
        array: {
          arrayValue: {},
        },
      })
    ).toEqual({ array: [] });
  });

  test('Array match with undefined value', () => {
    expect(
      FireStoreParser({
        array: {
          arrayValue: undefined,
        },
      })
    ).toEqual({ array: [] });
  });
});
