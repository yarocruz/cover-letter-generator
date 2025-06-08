export function getCoverLetterCount() {
    return parseInt(localStorage.getItem('coverLetterCount') || '0', 10);
}

export function incrementCoverLetterCount() {
    const current = getCoverLetterCount();
    localStorage.setItem('coverLetterCount', current + 1);
}
