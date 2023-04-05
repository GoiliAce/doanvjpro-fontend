import './search.css'
export const Search = () => {
    return (
        <div className="search">
            <div className="search-wrapper">
                <div className="search-input">
                    <input type="text" placeholder="Anh Hậu coder" />
                    <i className="fas fa-search icon-search"></i>
                </div>
            </div>
        </div>
    );
}