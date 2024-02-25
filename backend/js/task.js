
/**
 * Task 1
 */
function leafFiles(files) {

    const leafFiles = [];

    const parents = files.map(file => file.parent)

    for (const file of files) {
        const parent = parents.find(a => a === file.id);
        
        if (!parent) {
            leafFiles.push(file.name)
        }
    }

    return leafFiles;
}

/**
 * Task 2
 */
function kLargestCategories(files, k) {

    // go through the files and find the k most occured catagories
    // sort them by count / alphabetical order .sort()

    const categories = [];

    for (const file of files) {
        for (const category of file.categories) {
            
            const existingCategory = categories.find(a => a.name === category)
    
            if(!existingCategory) {
                categories.push({
                    name: category,
                    count: 1,
                })
            } else {
                existingCategory.count++;

            }
        }
    }

    categories.sort((category1, category2) => {
        if (category1.count !== category2.count) {
            return category2.count - category1.count;
        } else {
            return category1.name.localeCompare(category2.name);
        }
    });

    categories.splice(k,);

    return categories.map(category => category.name);
}

/**
 * Task 3
 */
function largestFileSize(files) {

    const parents = files.filter(file => file.parent === -1)

    let max = 0;
    for (const parent of parents) {
        const size = largestFileRecur(parent, files) + parent.size
        
        if (size > max) {
            max = size;
        }
    }

    return max;
}

function largestFileRecur(parent, files) {
    const children = files.filter(file => file.parent === parent.id)

    let totalSize = 0;

    for (const child of children) {
        totalSize += child.size;
        totalSize += largestFileRecur(child, files);
    }

    return totalSize
}




function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

const testFiles2 = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles2, 20),
    ["Documents", "Media", "Photos"]
));


console.assert(largestFileSize(testFiles) == 20992)
