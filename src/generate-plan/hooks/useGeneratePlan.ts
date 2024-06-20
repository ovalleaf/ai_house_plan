import { ListPicker } from '@/components/ui';
import { generatePlan } from '@/generate-plan/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { mdiBathtubOutline, mdiBedDoubleOutline, mdiBedKingOutline, mdiBedOutline, mdiChefHat, mdiCountertopOutline, mdiSofaOutline, mdiStove } from '@mdi/js';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import {z} from 'zod'

enum Numbers {
  One = 'One',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four'
}

const schema = z.object({
    bedRooms: z.nativeEnum(Numbers),
    kitchens: z.nativeEnum(Numbers),
    livingAreas: z.nativeEnum(Numbers),
    bathRooms: z.nativeEnum(Numbers)
})

export type Type = z.infer<typeof schema>

const numberOptions = Object.values(Numbers).map((value) => ({value, label: value}))

export function useGeneratePlan({ onCompleted }: Props) {
      const onSubmit = async (values: Type,e?: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const results = await generatePlan(values);
        
        onCompleted(results);
      }
      
      return {
        onSubmit,
        fields: [
          { icon: mdiBedOutline,type: "ListPicker", label: 'How many bed rooms?',name: "bedRooms", options: numberOptions },
          { icon: mdiBathtubOutline,type: "ListPicker", label: 'How many bath rooms?',name: "bathRooms", options: numberOptions },
          { icon: mdiChefHat,type: "ListPicker", label: 'How many kitchens?',name: "kitchens", options: numberOptions },
          { icon: mdiSofaOutline,type: "ListPicker", label: 'How many living areas?',name: "livingAreas", options: numberOptions },
        ] as const,
        schema
      }
}
export type GeneratedPlanResults = Awaited<ReturnType<typeof generatePlan>>
export interface Props {
  onCompleted: (result: GeneratedPlanResults) => void
}