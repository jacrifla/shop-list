import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getItemPricesWithNames } from '../services/itemPriceHistoryService';
import { formatDate } from '../utils/function';

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceMetrics() {
  const [priceData, setPriceData] = useState(null);
  const [groupedItems, setGroupedItems] = useState([]);
  const hasLoggedRef = useRef(false); // Ref para evitar log duplicado

  // Buscar dados de preços ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItemPricesWithNames();
        
        if (!hasLoggedRef.current) {
          hasLoggedRef.current = true;
        }

        setPriceData(data);
      } catch (error) {
        console.error('Erro ao carregar dados de preços:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (priceData) {
      // Agrupar os dados por item_id
      const groupedItems = priceData.reduce((acc, entry) => {
        if (!acc[entry.item_id]) {
          acc[entry.item_id] = [];
        }
        acc[entry.item_id].push(entry);
        return acc;
      }, {});
  
      // Calcular as métricas para cada item
      const itemMetrics = Object.keys(groupedItems).map((itemId) => {
        const itemData = groupedItems[itemId];
  
        const prices = itemData.map((entry) => parseFloat(entry.price));
        const quantities = itemData.map((entry) => entry.quantity);
  
        // Preço médio
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  
        // Preço mais baixo e mais alto
        const lowestPrice = Math.min(...prices);
        const highestPrice = Math.max(...prices);
  
        // Variação de preço
        const priceVariation = prices.length > 1 ? highestPrice - lowestPrice : 0;
  
        // Quantidade total vendida
        const totalSold = quantities.reduce((sum, quantity) => sum + quantity, 0);
  
        // Preço médio ponderado por quantidade
        const weightedAveragePrice =
          itemData.reduce((sum, entry) => sum + parseFloat(entry.price) * entry.quantity, 0) / totalSold;
  
        // Pegando o nome do item
        const itemName = itemData[0].item_name; // Como estamos agrupando por item_id, o nome será o mesmo para todas as entradas
  
        // Organizar os dados para o gráfico
        const chartData = {
          labels: itemData.map((entry) => formatDate(entry.date)), // Usando a data como rótulo
          datasets: [
            {
              label: `${itemName} - Preço Médio`, // Exibe o nome do item no gráfico
              data: prices,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: false,
              tension: 0.1,
            },
          ],
        };
  
        return {
          itemId,
          itemName, // Adiciona o nome do item ao objeto de métricas
          averagePrice,
          lowestPrice,
          highestPrice,
          priceVariation,
          totalSold,
          weightedAveragePrice,
          chartData, // Dados para o gráfico
        };
      });
  
      setGroupedItems(itemMetrics); // Atualiza o estado com as métricas calculadas
    }
  }, [priceData]);
  

  if (!groupedItems.length) {
    return <div>Sem dados de preços disponíveis.</div>;
  }

  return (
    <div>
      <h3>Métricas de Preço</h3>
      <div className="d-flex flex-wrap gap-4">
        {groupedItems.map((metric) => (
          <div key={metric.itemId} className="card mb-4 p-4 border rounded-lg shadow-sm bg-light" style={{ width: 'calc(33.33% - 1rem)', marginBottom: '1rem' }}>
            <h4 className="text-lg font-semibold mb-2">Métricas do Item {metric.itemName}</h4>
            <div>
              <h5>Preço Médio</h5>
              <p className="text-sm">R$ {metric.averagePrice.toFixed(2)}</p>
            </div>
            <div>
              <h5>Preço Mais Baixo e Mais Alto</h5>
              <p className="text-sm">
                Baixo: R$ {metric.lowestPrice.toFixed(2)} | Alto: R$ {metric.highestPrice.toFixed(2)}
              </p>
            </div>
            <div>
              <h5>Variação de Preço</h5>
              <p className="text-sm">R$ {metric.priceVariation.toFixed(2)}</p>
            </div>
            <div>
              <h5>Quantidade Total Vendida</h5>
              <p className="text-sm">{metric.totalSold} unidades</p>
            </div>
            <div>
              <h5>Preço Médio por Quantidade</h5>
              <p className="text-sm">R$ {metric.weightedAveragePrice.toFixed(2)}</p>
            </div>

            <div style={{ height: '200px', width: '100%' }}>
              <Line data={metric.chartData} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceMetrics;
