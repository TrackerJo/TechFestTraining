
export function checkFiles(solutionFile, uploadedFile){
    const solution = fs.readFileSync(solutionFile, 'utf8');
    const uploaded = fs.readFileSync(uploadedFile, 'utf8');
    return solution.equals(uploaded);
}