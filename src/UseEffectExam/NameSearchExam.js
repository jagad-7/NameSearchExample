import React, { useState, useEffect } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";
const NameSearchExam = () => {
  const [name, setName] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({status: false, msg: ''})


  const FetchName = async (nameURL) => {
    setLoading(true)
    setIsError({status: false, msg: ''})
    try {
      const response = await fetch(nameURL);
      const data = await response.json();
      setName(data);
      setLoading(false)
      setIsError({status: false, msg: ''})
    } catch (error) {
        setLoading(false)
        setIsError({status: true, msg: error.message || 'Something Went Wrong!'})
    }
  };

  useEffect(() => {
    const newURL = `${URL}${searchItem} `;
    FetchName(newURL);
  }, [searchItem]);

  const filteredNames = name.filter(
    (eachName) => eachName.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  return (
    <div>
      <h1>NameSearchExam</h1>
      <form>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Enter Details"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </form>
      {loading && !isError?.status && <h4>Loading....</h4>}
      {!isError?.status && <h4 style={{color: 'redwine'}}>{isError.msg}</h4>}
      {!loading && !isError?.status &&  (
        <ul>
            {filteredNames.map((eachName) => {
          const { id, name } = eachName;
          return (
            <div key={id}>
              <h4>{name}</h4>
            </div>
          );
        })}
        </ul>
      ) }
    </div>
  );
};

export default NameSearchExam;



