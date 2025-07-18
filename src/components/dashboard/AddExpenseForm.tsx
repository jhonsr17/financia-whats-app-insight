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
  onExpenseAdded: () => void;
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

export default function AddExpenseForm({ onExpenseAdded }: AddExpenseFormProps) {
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
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
          tipo: 'gasto',
          usuario_id: user.id,
          creado_en: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Gasto registrado correctamente",
      });

      // Limpiar formulario
      setValor('');
      setCategoria('');
      setDescripcion('');

      // Actualizar los datos
      onExpenseAdded();
    } catch (error) {
      console.error('Error registrando gasto:', error);
      toast({
        title: "Error",
        description: "No se pudo registrar el gasto",
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
          Registrar Gasto
        </CardTitle>
        <CardDescription>
          Añade un nuevo gasto y visualízalo en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? 'Registrando...' : 'Registrar Gasto'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}