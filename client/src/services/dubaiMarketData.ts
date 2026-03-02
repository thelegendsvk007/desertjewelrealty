// Dubai Market Data Service - Integration with Dubai Land Department API
export interface DubaiMarketDataResponse {
  success: boolean;
  data: {
    transactions: TransactionData[];
    priceIndices: PriceIndexData[];
    areaSummary: AreaSummaryData[];
    rentalData: RentalData[];
  };
  lastUpdated: string;
}

export interface TransactionData {
  transactionId: string;
  date: string;
  area: string;
  propertyType: string;
  bedrooms: number;
  size: number;
  price: number;
  pricePerSqft: number;
  saleType: 'sale' | 'mortgage';
  isOffPlan: boolean;
}

export interface PriceIndexData {
  area: string;
  month: string;
  year: number;
  avgPricePerSqft: number;
  priceChangePercent: number;
  transactionVolume: number;
}

export interface AreaSummaryData {
  area: string;
  totalTransactions: number;
  avgPrice: number;
  medianPrice: number;
  priceChange: number;
  salesVolume: number;
  avgRentalYield: number;
  propertyTypes: {
    apartment: number;
    villa: number;
    penthouse: number;
    townhouse: number;
  };
}

export interface RentalData {
  area: string;
  propertyType: string;
  avgRent: number;
  rentalYield: number;
  renewalRate: number;
}

class DubaiMarketDataService {
  private dldApiUrl = 'https://dubailand.gov.ae/api/v1';
  private dxbInteractUrl = 'https://api.dxbinteract.com/v1';
  
  async fetchLiveMarketData(timeframe: string = '2025'): Promise<DubaiMarketDataResponse> {
    try {
      // Attempt to fetch from Dubai Land Department API
      const [transactions, priceIndices, areaSummary, rentalData] = await Promise.allSettled([
        this.fetchTransactionData(timeframe),
        this.fetchPriceIndices(),
        this.fetchAreaSummary(),
        this.fetchRentalData()
      ]);

      return {
        success: true,
        data: {
          transactions: transactions.status === 'fulfilled' ? transactions.value : [],
          priceIndices: priceIndices.status === 'fulfilled' ? priceIndices.value : [],
          areaSummary: areaSummary.status === 'fulfilled' ? areaSummary.value : [],
          rentalData: rentalData.status === 'fulfilled' ? rentalData.value : []
        },
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching live market data:', error);
      throw new Error('Unable to fetch live market data from Dubai Land Department. API credentials may be required.');
    }
  }
  
  async fetchTransactionData(timeframe: string = '2025'): Promise<TransactionData[]> {
    const apiKey = import.meta.env.VITE_DUBAI_LAND_API_KEY;
    
    if (!apiKey) {
      throw new Error('Dubai Land Department API key not configured');
    }

    try {
      const response = await fetch(`${this.dldApiUrl}/transactions?period=${timeframe}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'X-API-Version': '1.0'
        }
      });
      
      if (response.status === 401) {
        throw new Error('Invalid API credentials for Dubai Land Department');
      }
      
      if (response.ok) {
        const data = await response.json();
        return this.parseTransactionData(data);
      }
      
      // Fallback to alternative sources
      return await this.fetchFromAlternativeSource(timeframe);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      throw error;
    }
  }
  
  async fetchPriceIndices(area?: string): Promise<PriceIndexData[]> {
    const apiKey = import.meta.env.VITE_DUBAI_LAND_API_KEY;
    
    try {
      const url = area 
        ? `${this.dldApiUrl}/price-indices?area=${encodeURIComponent(area)}`
        : `${this.dldApiUrl}/price-indices`;
        
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return this.parsePriceIndexData(data);
      }
      
      throw new Error('Price index data unavailable');
    } catch (error) {
      console.error('Error fetching price indices:', error);
      return [];
    }
  }
  
  async fetchAreaSummary(): Promise<AreaSummaryData[]> {
    const apiKey = import.meta.env.VITE_DUBAI_LAND_API_KEY;
    
    try {
      const response = await fetch(`${this.dldApiUrl}/area-summary`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return this.parseAreaSummaryData(data);
      }
      
      throw new Error('Area summary data unavailable');
    } catch (error) {
      console.error('Error fetching area summary:', error);
      return [];
    }
  }
  
  async fetchRentalData(): Promise<RentalData[]> {
    const apiKey = import.meta.env.VITE_DUBAI_LAND_API_KEY;
    
    try {
      const response = await fetch(`${this.dldApiUrl}/rental-index`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return this.parseRentalData(data);
      }
      
      throw new Error('Rental data unavailable');
    } catch (error) {
      console.error('Error fetching rental data:', error);
      return [];
    }
  }
  
  private async fetchFromAlternativeSource(timeframe: string): Promise<TransactionData[]> {
    const dxbApiKey = import.meta.env.VITE_DXB_INTERACT_API_KEY;
    
    if (!dxbApiKey) {
      throw new Error('Alternative data source API key not configured');
    }
    
    try {
      const response = await fetch(`${this.dxbInteractUrl}/market-data?period=${timeframe}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${dxbApiKey}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return this.parseTransactionData(data);
      }
      
      throw new Error('Alternative data source unavailable');
    } catch (error) {
      console.error('Error fetching from alternative source:', error);
      throw error;
    }
  }
  
  // Data parsing methods
  private parseTransactionData(data: any): TransactionData[] {
    if (!data || !Array.isArray(data.transactions)) {
      return [];
    }
    
    return data.transactions.map((transaction: any) => ({
      transactionId: transaction.id || transaction.transaction_id || '',
      date: transaction.date || transaction.transaction_date || '',
      area: transaction.area || transaction.location || '',
      propertyType: transaction.property_type || transaction.type || '',
      bedrooms: parseInt(transaction.bedrooms) || 0,
      size: parseFloat(transaction.size) || 0,
      price: parseFloat(transaction.price) || 0,
      pricePerSqft: parseFloat(transaction.price_per_sqft) || 0,
      saleType: transaction.sale_type === 'mortgage' ? 'mortgage' : 'sale',
      isOffPlan: transaction.is_off_plan || false
    }));
  }
  
  private parsePriceIndexData(data: any): PriceIndexData[] {
    if (!data || !Array.isArray(data.price_indices)) {
      return [];
    }
    
    return data.price_indices.map((index: any) => ({
      area: index.area || '',
      month: index.month || '',
      year: parseInt(index.year) || new Date().getFullYear(),
      avgPricePerSqft: parseFloat(index.avg_price_per_sqft) || 0,
      priceChangePercent: parseFloat(index.price_change_percent) || 0,
      transactionVolume: parseInt(index.transaction_volume) || 0
    }));
  }
  
  private parseAreaSummaryData(data: any): AreaSummaryData[] {
    if (!data || !Array.isArray(data.areas)) {
      return [];
    }
    
    return data.areas.map((area: any) => ({
      area: area.name || '',
      totalTransactions: parseInt(area.total_transactions) || 0,
      avgPrice: parseFloat(area.avg_price) || 0,
      medianPrice: parseFloat(area.median_price) || 0,
      priceChange: parseFloat(area.price_change) || 0,
      salesVolume: parseInt(area.sales_volume) || 0,
      avgRentalYield: parseFloat(area.avg_rental_yield) || 0,
      propertyTypes: {
        apartment: parseInt(area.property_types?.apartment) || 0,
        villa: parseInt(area.property_types?.villa) || 0,
        penthouse: parseInt(area.property_types?.penthouse) || 0,
        townhouse: parseInt(area.property_types?.townhouse) || 0
      }
    }));
  }
  
  private parseRentalData(data: any): RentalData[] {
    if (!data || !Array.isArray(data.rentals)) {
      return [];
    }
    
    return data.rentals.map((rental: any) => ({
      area: rental.area || '',
      propertyType: rental.property_type || '',
      avgRent: parseFloat(rental.avg_rent) || 0,
      rentalYield: parseFloat(rental.rental_yield) || 0,
      renewalRate: parseFloat(rental.renewal_rate) || 0
    }));
  }
}

export const dubaiMarketDataService = new DubaiMarketDataService();