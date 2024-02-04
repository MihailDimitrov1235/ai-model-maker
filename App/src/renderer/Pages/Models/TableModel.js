import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function TableModel() {
  const { id } = useParams();
  console.log(id);

  const fetchData = async () => {
    const response = await window.electronAPI.getModel({
      model: id,
      type: 'table',
    });
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return <div>TableModel</div>;
}
