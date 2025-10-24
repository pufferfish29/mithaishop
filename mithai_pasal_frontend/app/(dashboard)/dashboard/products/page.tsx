import React from 'react';
import ViewProducts from './_components/ViewProducts';

const dummyData = [
  {
    id: 1,
    name: 'Colorful Macarons',
    price: 2.5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Delicate French macarons in assorted flavors and colors.',
  },
  {
    id: 2,
    name: 'Chocolate Cupcake',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Rich chocolate cupcake topped with creamy frosting.',
  },
  {
    id: 3,
    name: 'Glazed Donuts',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Soft, fluffy donuts coated in sweet vanilla glaze.',
  },
  {
    id: 4,
    name: 'Fruit Tart',
    price: 4.5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp tart shell filled with custard and topped with fresh fruit.',
  },
  {
    id: 5,
    name: 'Gummy Bears',
    price: 1.25,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    description: 'Sweet and chewy gummy bears in assorted fruity flavors.',
  },
  {
    id: 6,
    name: 'Cheesecake Slice',
    price: 5.0,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    description: 'Creamy cheesecake with a buttery graham cracker crust.',
  },
  {
    id: 7,
    name: 'Lollipops',
    price: 0.75,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    description: 'Classic swirl lollipops in bright, cheerful colors.',
  },
  {
    id: 8,
    name: 'Chocolate Bar',
    price: 2.0,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    description: 'Smooth milk chocolate bar perfect for a quick treat.',
  },
  {
    id: 9,
    name: 'Cotton Candy',
    price: 3.0,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    description: 'Fluffy spun sugar in pastel colors, melts in your mouth.',
  },
  {
    id: 10,
    name: 'Caramel Apple',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp apple coated in rich, gooey caramel.',
  },
];

const page = () => {
  return (
    <div className="max-w-[1700px] mx-auto px-10 overflow-y-auto">
      <ViewProducts data={dummyData} />
    </div>
  );
};

export default page;
