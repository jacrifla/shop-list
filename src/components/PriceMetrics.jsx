import React, { useState, useEffect, useRef } from 'react';
import { getItemPricesWithNames } from '../services/itemPriceHistoryService';
import { formatDate } from '../utils/function';

function PriceMetrics() {
  const [priceData, setPriceData] = useState(null);
  const [groupedItems, setGroupedItems] = useState([]);
  const hasLoggedRef = useRef(false);

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
  
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const lowestPrice = Math.min(...prices);
        const highestPrice = Math.max(...prices);
        const priceVariation = prices.length > 1 ? highestPrice - lowestPrice : 0;
        const totalSold = quantities.reduce((sum, quantity) => sum + quantity, 0);
        const weightedAveragePrice =
          itemData.reduce((sum, entry) => sum + parseFloat(entry.price) * entry.quantity, 0) / totalSold;
  
        const itemName = itemData[0].item_name;
  
        return {
          itemId,
          itemName,
          averagePrice,
          lowestPrice,
          highestPrice,
          priceVariation,
          totalSold,
          weightedAveragePrice,
          priceHistory: itemData.map((entry) => ({
            date: formatDate(entry.date),
            price: entry.price,
          })),
        };
      });
  
      setGroupedItems(itemMetrics);
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
            <div>
              <h5>Histórico de Preços</h5>
              <ul className="text-sm">
                {metric.priceHistory.map((entry, index) => (
                  <li key={index}>
                    {entry.date}: R$ {parseFloat(entry.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceMetrics;
