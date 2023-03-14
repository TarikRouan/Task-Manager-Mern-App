import { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../features/Lists/listSlice";

const AddList = () => {
  const dispatch = useDispatch();

  const [list, setList] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createList({ title: list }));
    setList("");
  };

  return (
    <section>
      <h1> Create New List </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">List</label>
        <input
          type="text"
          id="title"
          name="title"
          value={list}
          onChange={(e) => setList(e.target.value)}
        />
        <button type="submit">Create List</button>
      </form>
    </section>
  );
};

export default AddList;
