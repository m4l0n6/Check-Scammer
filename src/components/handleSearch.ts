export const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    const searchQuery = input?.value || '';
    
    window.location.href = `/scammer?search=${encodeURIComponent(searchQuery)}`;

}