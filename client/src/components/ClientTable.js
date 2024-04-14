import { observer } from "mobx-react-lite";
import { React, useContext, useEffect } from "react";
import { Context } from '../index';
import { Table } from "react-bootstrap";
import { Dropdown } from 'react-bootstrap';
import { fetchClients } from "../http/clientAPI"; 

const ClientTable = observer(() => {
  const { client } = useContext(Context);

  const handleChangeStatus = async (clientId, newStatus) => {
    try {
      await client.changeClientStatus(clientId, newStatus);
      
    } catch (error) {
      console.error("Error changing client status:", error);
      
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await fetchClients(); 
        client.setClients(clients); 
      } catch (error) {
        console.error("Error fetching clients:", error);
        
      }
    };
    fetchData();
  }, [client]);

  return (
    <div>
      <h2>Список клиентов</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>ИНН</th>
            <th>Статус</th>
            <th>Ответственный</th>
          </tr>
        </thead>
        <tbody>
          {client.clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.lastName} {client.firstName} {client.surName}</td>
              <td>{new Date(client.birthDate).toLocaleDateString()}</td>
              <td>{client.inn}</td>
              <td>
                <Dropdown onSelect={(eventKey) => handleChangeStatus(client.id, eventKey)}
                className="d-flex justify-content-center"
                
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {client.status}
                  </Dropdown.Toggle>

                  <Dropdown.Menu >
                    <Dropdown.Item eventKey="Не в работе">Не в работе</Dropdown.Item>
                    <Dropdown.Item eventKey="В работе">В работе</Dropdown.Item>
                    <Dropdown.Item eventKey="Отказ">Отказ</Dropdown.Item>
                    <Dropdown.Item eventKey="Сделка завершена">Сделка завершена</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>{client.User.lastName} {client.User.firstName} {client.User.surName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default ClientTable;
