export function ConverBit(size:number) {
    var rank = 0;
    while (size > 1024)
        size = size / 1024, rank++;
    if (rank == 1)
        return size.toFixed(0) + " KB";
    else if (rank == 2)
        return size.toFixed(2) + " MB";
    else if (rank == 3)
        return size.toFixed(2) + " GB";
    else return size.toFixed(0) + " Bytes";
}

