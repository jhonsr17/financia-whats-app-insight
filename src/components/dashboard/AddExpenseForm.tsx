import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddExpenseFormProps {
  onTransactionAdded: () => void;
}

const categories = [
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Hogar',
  'Ropa',
  'Otros'
];

export default function AddExpenseForm({ onTransactionAdded }: AddExpenseFormProps) {
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState<'gasto' | 'ingreso'>('gasto');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!valor || !categoria) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Debes estar autenticado para registrar gastos",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('transacciones')
        .insert({
          valor: parseFloat(valor),
          categoria,
          descripcion: descripcion || null,
          tipo: tipo,
          usuario_id: user.id,
          creado_en: new Date().toISOString()
        });

      if (error) throw error;

      console.log(`${tipo} registrado exitosamente:`, {
        valor: parseFloat(valor),
        categoria,
        descripcion,
        tipo: tipo,
        usuario_id: user.id
      });

      toast({
        title: "Éxito",
        description: `${tipo === 'gasto' ? 'Gasto' : 'Ingreso'} de $${parseFloat(valor).toLocaleString()} COP registrado correctamente`,
      });

      // Limpiar formulario
      setValor('');
      setCategoria('');
      setDescripcion('');

      // Actualizar los datos inmediatamente
      console.log('Actualizando métricas...');
      onTransactionAdded();
    } catch (error) {
      console.error(`Error registrando ${tipo}:`, error);
      toast({
        title: "Error",
        description: `No se pudo registrar el ${tipo}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Registrar Transacción
        </CardTitle>
        <CardDescription>
          Añade un nuevo gasto o ingreso y visualízalo en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tipo">Tipo *</Label>
            <Select value={tipo} onValueChange={(value: 'gasto' | 'ingreso') => setTipo(value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gasto">💸 Gasto</SelectItem>
                <SelectItem value="ingreso">💰 Ingreso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="valor">Valor (COP) *</Label>
            <Input
              id="valor"
              type="number"
              placeholder="50000"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              min="0"
              step="100"
              required
            />
          </div>

          <div>
            <Label htmlFor="categoria">Categoría *</Label>
            <Select value={categoria} onValueChange={setCategoria} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              placeholder="Ej: Almuerzo en restaurante"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registrando...' : `Registrar ${tipo === 'gasto' ? 'Gasto' : 'Ingreso'}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}