import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Tabular() {
  const [info, setInfo] = useState({});
  const { id } = useParams();
  const fetchInfo = async () => {
    const newInfo = await window.electronAPI.getDatasetInfo({ name: id });
    setInfo(newInfo);
  };
  //   fetchInfo();
  useEffect(() => {
    fetchInfo();
  }, []);
  return <div>Tabular</div>;
}
