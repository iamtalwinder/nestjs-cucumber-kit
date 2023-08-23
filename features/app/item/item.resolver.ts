import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities';
import { ItemDto } from './dto';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => [Item], { name: 'getAllItems' })
  getAllItems(): Item[] {
    return this.itemService.getAll();
  }

  @Query(() => Item, { name: 'getItem' })
  getItem(@Args('id') id: string): Item {
    return this.itemService.getOne(id);
  }

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemDto: ItemDto): Item {
    return this.itemService.create(createItemDto);
  }

  @Mutation(() => Item)
  updateItem(@Args('id') id: string, @Args('updateItemInput') updateItemDto: ItemDto): Item {
    return this.itemService.update(id, updateItemDto);
  }
}
