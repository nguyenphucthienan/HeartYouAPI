class ServiceHelpers {
  static createUserFilterObject(filterString) {
    if (!filterString) {
      return {};
    }

    const textFields = ['username', 'email', 'firstName', 'lastName'];

    return filterString.split('|')
      .reduce((filterObj, item) => {
        const splitedItem = item.split(':');
        const key = splitedItem[0];
        const value = splitedItem[1];

        const newFilterObject = { ...filterObj };

        if (textFields.includes(key)) {
          newFilterObject[key] = new RegExp(value, 'i');
        } else {
          newFilterObject[key] = value;
        }

        return newFilterObject;
      }, {});
  }

  static createFilterObject(filterString) {
    if (!filterString) {
      return {};
    }

    return filterString.split('|')
      .reduce((filterObj, item) => {
        const splitedItem = item.split(':');
        const key = splitedItem[0];
        const value = splitedItem[1];

        const newFilterObject = { ...filterObj };
        newFilterObject[key] = value;

        return newFilterObject;
      }, {});
  }

  static createSortObject(sortString) {
    if (!sortString) {
      return { createdAt: -1 };
    }

    return sortString.split('|')
      .reduce((sortObj, item) => {
        const key = item.substr(1);
        const value = item.charAt(0) === '-' ? -1 : 1;

        const newSortObj = { ...sortObj };
        newSortObj[key] = value;
        return newSortObj;
      }, {});
  }
}

module.exports = ServiceHelpers;
