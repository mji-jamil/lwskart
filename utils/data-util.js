export const replaceMongoIdInArray = (array) => {
    return array
        .map((item) => {
            return {
                id: item._id.toString(),
                ...item,
            };
        })
        .map(({ _id, ...rest }) => rest);
};

export const replaceMongoIdInObject = (obj) => {
    const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
    return updatedObj;
};