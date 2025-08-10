import React from 'react';
import { Input, Textarea } from './Input';
import Button from './Button';

/**
 * CardForm - Formulaire de carte business en 2 colonnes
 */
export function CardForm({ onSubmit, initial = {} }) {
  return (
    <form onSubmit={onSubmit} className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Input 
          defaultValue={initial.title} 
          required 
          name="title" 
          placeholder="Titre" 
          className="w-full"
        />
        <Input 
          defaultValue={initial.subtitle} 
          name="subtitle" 
          placeholder="Sous-titre" 
          className="w-full"
        />
        <Textarea 
          defaultValue={initial.description} 
          name="description" 
          maxLength={1024} 
          placeholder="Description (≤1024)" 
          className="w-full"
        />
        <Input 
          defaultValue={initial.image} 
          name="image" 
          type="url" 
          placeholder="Image (https)" 
          className="w-full"
        />
      </div>
      <div className="space-y-4">
        <Input 
          defaultValue={initial.phone} 
          name="phone" 
          placeholder="Téléphone" 
          className="w-full"
        />
        <Input 
          defaultValue={initial.email} 
          name="email" 
          type="email" 
          placeholder="Email" 
          className="w-full"
        />
        <Input 
          defaultValue={initial.web} 
          name="web" 
          type="url" 
          placeholder="Site (https)" 
          className="w-full"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input 
            defaultValue={initial.lat} 
            name="lat" 
            placeholder="Lat" 
            className="w-full"
          />
          <Input 
            defaultValue={initial.lng} 
            name="lng" 
            placeholder="Lng" 
            className="w-full"
          />
        </div>
        <Button variant="primary" className="w-full">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}

export default CardForm;
