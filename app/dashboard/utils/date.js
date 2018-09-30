export const getModifiedDate = (now, lastModified) => {
    const ms = now - lastModified;
    const d = Math.floor(ms / 3600000 / 24);
    if (d > 0) {
        return `${d} 天前`;
    } else {
        return '今天';
    }
}

export const getDeletedTime = (now, lastModified) => {
    const ms = now - lastModified;
    const d = Math.floor(ms / 3600000 / 24);
    if (d > 0) {
        return `${d} 天前`;
    } else {
        let h = Math.floor(ms / 3600000 % 24);
        h = h < 0 ? 0 : h;
        let m = Math.floor(ms / 60000 % 24);
        m = m < 0 ? 0 : m;
        let s = Math.floor(ms / 1000 % 60);
        s = s < 0 ? 0 : s;
        return `${h} 小时 ${m} 分 ${s} 秒前`;
    }
}
