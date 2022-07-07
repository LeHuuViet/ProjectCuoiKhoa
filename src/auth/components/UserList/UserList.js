function UserList() {
  return (
    <div className="UserList">
      <div>
        <h2 className="userlist-title">Search for user</h2>
        <div className="userlist-search-from">
          <form>
            <ul className="userlist-search-1 d-flex">
              <li>
                <input placeholder="Search keywords" />
              </li>
              <li>
                <select defaultValue={"All memberships"}>
                  <option>General</option>
                  <option>General</option>
                </select>
              </li>
              <li>
                <select>All user types</select>
              </li>
              <li>
                <select></select>
              </li>
              <li>
                <div>
                  <button>Search</button>
                </div>
              </li>
            </ul>
            <div className="line-1"></div>
            <ul className="userlist-search-2 d-flex">
              <li>
                <ul>
                  <li>
                    <label>Country</label>
                    <select></select>
                  </li>
                  <li>
                    <label>State</label>
                    <input />
                  </li>
                  <li>
                    <label>Address</label>
                    <input />
                  </li>
                  <li>
                    <label>Phone</label>
                    <input />
                  </li>
                </ul>
              </li>
              <li>
                <div className="d-flex">
                  <label>User activity</label>
                  <div>
                    <ul>
                      <li>
                        <input type={"checkbox"} />
                        <label>Register</label>
                      </li>
                      <li>
                        <input type={"checkbox"} />
                        <label>Last Logged in</label>
                      </li>
                    </ul>
                    <input />
                  </div>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserList;
